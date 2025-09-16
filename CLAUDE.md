# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI tool for resolving Farcaster FID-based DIDs using the AT Protocol's DID resolver implementation. The actual did:fid implementation is in the `atproto` git submodule (branch: `cboscolo/farcaster-did`), while this repository provides a command-line interface and documentation for the proposed third blessed DID method for AT Protocol.

## Project Structure

### Current Repository
- `index.ts` - CLI entry point with command routing (help, lookup)
- `atproto/` - Git submodule containing the actual did:fid implementation
- `oldfid/` - Archived local implementation (moved to atproto submodule)
- `package.json` - Project configuration with CLI scripts
- `README.md` - Comprehensive documentation and proposal for did:fid as third blessed DID method

### AT Proto Submodule Implementation
The actual did:fid resolver is implemented in `atproto/packages/identity/src/did/fid-resolver.ts`:
- `DidFidResolver` class - Handles DID resolution by querying Farcaster contracts on Optimism
- Integrated into `DidResolver` at `atproto/packages/identity/src/did/did-resolver.ts`
- Automatically routes `did:fid:*` DIDs to the appropriate resolver

### Farcaster Contract Integration
The resolver queries on-chain data from Optimism contracts:
- ID Registry: `0x00000000Fc6c5F01Fc30151999387Bb99A9f489b` - Manages FID ownership and custody addresses
- Key Registry: `0x00000000Fc1237824fb747aBDE0FF18990E59b7e` - Tracks signing keys for FIDs
- [Proposed] AT Proto Registry - Will store AT Protocol handles, verification methods, and PDS endpoints (not yet deployed)

## Features

### Implemented
- ✅ CLI tool with help and lookup commands
- ✅ Resolves `did:fid:<fid>` into W3C compliant DID Documents
- ✅ Uses only smart contract data from Optimism
- ✅ Includes FID custody addresses as verification methods using `#farcaster`
- ✅ Includes recovery addresses as `#farcaster-recovery`
- ✅ Includes Farcaster signer keys from KeyRegistry as `#farcaster-signerN`
- ✅ Full TypeScript support with proper type definitions
- ✅ Integrates with AT Protocol DID resolver pattern
- ✅ Placeholder for future AT Protocol service integration

### Planned
- Deploy AT Proto registry smart contract
- Add registration capabilities for new did:fid
- Farcaster mini-app for existing users to add AT Protocol info
- Migration tools from did:plc to did:fid

## Development Commands

```bash
# Initial setup (clone with submodules and build)
git clone <repository-url>
cd farcaster-did
git submodule update --init --recursive
bun run setup  # Builds atproto submodule

# Install dependencies
bun install

# CLI Usage
bun run fid help              # Show help
bun run fid lookup <fid>      # Resolve a FID
bun run fid lookup 1898       # Example

# Build atproto submodule after changes
bun run build:atproto

# Update atproto submodule to latest
cd atproto
git fetch
git checkout cboscolo/farcaster-did
git pull
npm run build
cd ..
```

## Testing and Development

When working on the CLI:
1. Test with FID 1898 (known test case)
2. The resolver fetches custody addresses, recovery addresses, and signer keys from Optimism
3. Returns a W3C-compliant DID Document with appropriate verification methods
4. Includes placeholder data for AT Protocol integration (handle, PDS endpoint)

## Important Notes

- The did:fid implementation lives in the atproto submodule, not this repository
- This repository serves as a CLI tool and proposal documentation
- Uses Viem for Ethereum/Optimism interaction
- Placeholder AT Protocol data uses format `fid-<fid>.bsky.social` for handles
- Cost structure: ~$1 to register, <$0.01 to update
- Resolution is free (just gas for reading)

## Project Goals

This project aims to establish did:fid as the third blessed DID method for AT Protocol, providing:
- Censorship resistance through smart contracts
- Credible neutrality (no central authority)
- Better balance between self-custody and recoverability
- Integration with 1M+ existing Farcaster identities