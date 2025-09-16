# did:fid - A Credibly Neutral and Censorship-Resistant DID Method for AT Protocol

A proposal to establish `did:fid` as the third blessed DID method for AT Protocol, leveraging Farcaster's decentralized identity infrastructure.

## Vision

We propose `did:fid` as a censorship-resistant addition to AT Protocol's supported DID methods. Unlike the existing `did:web` and `did:plc` methods, `did:fid` offers credibly neutral decentralization through smart contracts on Optimism, providing users with sovereign control over their identities.

## Background: DIDs in AT Protocol

In AT Protocol, Decentralized Identifiers (DIDs) serve as the foundation of user identity. They function as decentralized accounts. DIDs provide:
- **Persistent Identity**: Users maintain the same identifier across different services
- **Account Ownership**: DIDs act as the user's decentralized account, controlling access to their social graph and content
- **Cryptographic Verification**: DIDs contain public keys for authenticating users and verifying signatures
- **Service Discovery**: DIDs point to where user data is hosted (PDS - Personal Data Server)
- **Provider Independence**: Users can migrate between providers of these services while keeping their identity

Currently, AT Protocol supports two DID methods ([see specification](https://atproto.com/specs/did)):
- `did:plc` - A centralized registry currently controlled by Bluesky PBC
- `did:web` - Based on DNS/HTTPS, they not suitable for individual user DIDs but great for Brands.

## Why did:fid?

### The Censorship Problem

Both existing DID methods have critical weaknesses:
- **did:plc**: Centrally controlled by Bluesky PBC, creating a single point for censoring updates (and in some cases retrieval)
- **did:web**: Dependent on traditional web infrastructure (DNS, certificate authorities) that can be censored or seized

### The Farcaster Solution

`did:fid` builds on Farcaster's proven identity system:
- **1+ Million Users**: Farcaster has over 1 million registered decentralized identities
- **Smart Contract Based**: Runs entirely on Ethereum L2 blockchain, ensuring credible neutrality
- **No Central Authority**: No single entity can censor or revoke identities
- **Battle-Tested**: Operating successfully in production for years
- **Recovery & Security Balance**: Farcaster IDs provide an optimal balance between self-custody and recoverability. Users control their custody address (can transfer ownership), recovery address (can recover if custody key is lost), and signer keys (for day-to-day operations). This three-tier security model prevents both accidental loss and unauthorized access ([learn more](https://docs.farcaster.xyz/learn/what-is-farcaster/accounts))

## Implementation

This repository demonstrates how Farcaster DIDs can integrate with AT Protocol:

### Current Features
- ✅ Resolves existing `did:fid` identifiers to W3C-compliant DID Documents
- ✅ Retrieves on-chain custody addresses, recovery addresses, and signing keys
- ✅ Integrates seamlessly with AT Protocol's DID resolver pattern
- ✅ CLI tool for testing and exploration

### Architecture
```
Optimism Smart Contracts:
├── ID Registry (0x00000000Fc6c5F01Fc30151999387Bb99A9f489b)
│   └── Manages FID ownership and custody
├── Key Registry (0x00000000Fc1237824fb747aBDE0FF18990E59b7e)
│   └── Tracks signing keys for FIDs
└── [Proposed] AT Proto Registry
    └── Stores AT Proto handles, verification methods, and PDS endpoints
```

### Missing Piece

One additional smart contract needs to be deployed to store AT Protocol-specific data:
- **AT Proto Handle**: User's handle in the AT Protocol network
- **Verification Method**: AT Protocol signing keys
- **PDS Service Endpoint**: Location of user's Personal Data Server

The current implementation includes placeholders for this data.

## Economics

### Cost Structure
- **Registration**: ~$1 to register a new did:fid
- **Updates**: Less than $0.01 per update
- **Lookups**: Free

### Sustainability Model
- Optional fees for AT Protocol registration could fund:
  - Public AT Protocol infrastructure
  - Open-source development
  - Decentralized relay and indexing services

## CLI Tool Usage

### Prerequisites
- [Bun](https://bun.sh/) runtime
- Git for submodule management
- Node.js and npm (for building dependencies)

### Setup

```bash
# Clone with submodules
git clone <repository-url>
cd farcaster-did
git submodule update --init --recursive

# Build dependencies
bun run setup

# Install packages
bun install
```

### Usage

```bash
# Show help and available commands
bun run fid help

# Resolve a Farcaster ID
bun run fid lookup <fid>

# Example
bun run fid lookup 1898
```

### Example Output

```json
{
  "id": "did:fid:1898",
  "verificationMethod": [
    {
      "id": "did:fid:1898#farcaster",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "did:fid:1898",
      "blockchainAccountId": "eip155:10:0x3eFbe95EBdE6042147644Bc39CdfcF54B8E4f523"
    }
  ],
  "service": [
    {
      "id": "#atproto_pds",
      "type": "AtprotoPersonalDataServer",
      "serviceEndpoint": "https://bsky.social"
    }
  ],
  "alsoKnownAs": ["at://fid-1898.bsky.social"]
}
```

## Roadmap

### Phase 1: Proof of Concept ✅
- DID resolution for existing Farcaster IDs
- Integration with AT Protocol resolver pattern
- CLI tool for testing

### Phase 2: AT Protocol Integration (Future)
- Deploy AT Proto registry smart contract
- Add handle and PDS registration methods

### Phase 3: User Tools (Future)
- Web interface for did:fid registration
- Farcaster frame/mini-app for existing Farcaster users to add AT Protocol info

### Phase 4: Ecosystem (Future)
- SDKs for multiple languages
- Integration with existing AT Protocol clients
- Documentation and developer resources

## Contributing

We welcome contributions to make did:fid a reality! Areas where help is needed:
- Farcaster mini app to for existing users to register and AT Protocol account
- Smart contract development for AT Proto registry
- Testing and security audits
- Documentation and specifications

## Technical Details

- **Blockchain**: Optimism (Layer 2 Ethereum)
- **Contracts**: Immutable, upgradeable through governance
- **Gas Costs**: Minimal due to L2 optimization

## References

- [AT Protocol DID Specification](https://atproto.com/specs/did)
- [Farcaster Protocol](https://docs.farcaster.xyz/)
- [W3C DID Core Specification](https://www.w3.org/TR/did-core/)

## License

MIT - Free to use, modify, and distribute

---

**Join us in building a truly decentralized social web where users own their identities.**