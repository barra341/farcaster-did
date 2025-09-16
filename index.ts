#!/usr/bin/env bun
import { DidResolver } from './atproto/packages/identity/src/did/did-resolver';

function showHelp() {
  console.log(`
did:fid CLI Tool - Resolve Farcaster DIDs for AT Protocol

Usage: bun run fid <command> [arguments]

Commands:
  lookup <fid>    Resolve a Farcaster ID to its DID Document
  help            Show this help message

Examples:
  bun run fid lookup 1898
  bun run fid help

Learn more: https://github.com/cboscolo/farcaster-did
`);
}

async function lookupFid(fid: string) {
  // Validate FID
  if (!/^\d+$/.test(fid)) {
    console.error('❌ Error: FID must be a positive integer');
    process.exit(1);
  }

  const did = `did:fid:${fid}`;

  console.log(`📋 Resolving: ${did}`);
  console.log('─'.repeat(50));
  
  try {
    // Initialize resolver with Optimism RPC and 30 second timeout
    const resolver = new DidResolver({
      timeout: 30000, // 30 seconds
      fidRpcUrl: 'https://mainnet.optimism.io'
    })
    const didDocument = await resolver.resolveNoCheck(did);
    
    if (!didDocument) {
      console.log('❌ Failed to resolve DID document');
      process.exit(1);
    }

    console.log('✅ Successfully resolved DID document');
    console.log(JSON.stringify(didDocument, null, 2));

  } catch (error) {
    console.error(`❌ Failed to resolve ${did}:`, error);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case 'help':
      showHelp();
      break;
    
    case 'lookup':
      if (args.length < 2) {
        console.error('❌ Error: lookup command requires a FID');
        console.error('Usage: bun run fid lookup <fid>');
        process.exit(1);
      }
      await lookupFid(args[1]);
      break;
    
    default:
      console.error(`❌ Error: Unknown command '${command}'`);
      console.error('Run "bun run fid help" for usage information');
      process.exit(1);
  }
}

main().catch(console.error);