// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface ICaelumSBT {
    // Adjust if your SBT signature differs
    function mint(address to, uint256 tokenId, string memory uri, string memory txid) external;
}

/**
 * @title ShardMinter
 * @notice UUPS upgradeable minter that supports:
 *         1) existing role-gated mint path (MINTER_ROLE),
 *         2) Base-only gasless mint via on-chain EIP-712 signature verification.
 */
contract ShardMinter is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    EIP712Upgradeable
{
    // -------------------- Roles --------------------
    bytes32 public constant MINTER_ROLE   = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // -------------------- External contracts --------------------
    ICaelumSBT public sbt;

    // -------------------- Storage --------------------
    uint256 public nextTokenId;

    /// @dev Per-user replay guard for gasless mint
    mapping(address => mapping(uint256 => bool)) public nonceUsed;

    // -------------------- Events --------------------
    event ShardMinted(address indexed user, uint256 indexed tokenId, string uri, string txid);

    // -------------------- EIP-712 Types --------------------
    /**
     * @dev Gasless mint intent signed by the user. Strings are hashed under EIP-712
     *      as keccak256(bytes(value)).
     */
    struct MemoryMint {
        address user;         // final owner on Base
        string  uri;          // metadata URI (whatever you pass to SBT)
        string  txid;         // Arweave/Irys id or locator
        bytes32 contentHash;  // deterministic hash (e.g. keccak256(bytes(txid)))
        uint64  timestamp;    // client-provided
        uint256 nonce;        // per-user unique
    }

    // Compute from the canonical type string to avoid mismatch bugs
    bytes32 private constant MINTINTENT_TYPEHASH =
        keccak256("MintIntent(address user,string uri,string txid,bytes32 contentHash,uint64 timestamp,uint256 nonce,uint64 deadline)");

    // -------------------- Constructor / Initializers --------------------

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializer for first deployment.
     * @param sbtAddress Address of the CaelumSBT contract.
     */
    function initialize(address sbtAddress) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        __EIP712_init("ShardMinter", "1");

        sbt = ICaelumSBT(sbtAddress);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        nextTokenId = 1;
    }

    /**
     * @notice One-time reinitializer if you upgrade an existing proxy
     *         to this EIP-712-enabled implementation. Call once after upgrade.
     */
    function initEIP712() public reinitializer(2) {
        __EIP712_init("ShardMinter", "1");
    }

    // -------------------- Existing role-gated path --------------------

    /**
     * @notice Existing path (kept intact). Relayer or backend with MINTER_ROLE can mint.
     * @dev Calls the same internal _doMint() path used by gasless flow.
     */
    function mintShard(address to, string memory uri, string memory arweaveTxId)
        external
        onlyRole(MINTER_ROLE)
    {
        _doMint(to, uri, arweaveTxId);
    }

    // -------------------- NEW: Gasless EIP-712 path --------------------

    /**
     * @notice Gasless path. Relayer pays Base gas; chain verifies the user's EIP-712 signature.
     * @param m         The MemoryMint typed data (user, uri, txid, contentHash, timestamp, nonce).
     * @param deadline  UNIX seconds after which this intent expires.
     * @param signature User's EIP-712 signature over MintIntent.
     */
    function mintWithSig(
        MemoryMint calldata m,
        uint64 deadline,
        bytes calldata signature
    ) external {
        require(block.timestamp <= deadline, "expired");
        require(!nonceUsed[m.user][m.nonce], "nonce-used");
        nonceUsed[m.user][m.nonce] = true;

        // Strings must be hashed as keccak256(bytes(value)) under EIP-712
        bytes32 structHash = keccak256(
            abi.encode(
                MINTINTENT_TYPEHASH,
                m.user,
                keccak256(bytes(m.uri)),
                keccak256(bytes(m.txid)),
                m.contentHash,
                m.timestamp,
                m.nonce,
                deadline
            )
        );
        bytes32 digest = _hashTypedDataV4(structHash);
        address recovered = ECDSA.recover(digest, signature);
        require(recovered == m.user, "bad-signer");

        _doMint(m.user, m.uri, m.txid);
    }

    // -------------------- Internal mint path --------------------

    /**
     * @dev Single internal path used by both role-gated and gasless flows.
     *      Adjust to match your SBT’s mint semantics.
     */
    function _doMint(
        address to,
        string memory uri,
        string memory arweaveTxId
    ) internal {
        uint256 tokenId = nextTokenId++;
        sbt.mint(to, tokenId, uri, arweaveTxId);
        emit ShardMinted(to, tokenId, uri, arweaveTxId);
    }

    // -------------------- Admin --------------------

    function setSBT(address sbtAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        sbt = ICaelumSBT(sbtAddress);
    }

    function setNextTokenId(uint256 _next) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nextTokenId = _next;
    }

    // -------------------- UUPS --------------------

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}
}
