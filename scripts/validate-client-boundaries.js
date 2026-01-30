#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules') continue; // Skip node_modules
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else {
      const low = full.toLowerCase();
      if (low.endsWith('.tsx') || low.endsWith('.ts')) acc.push(full);
    }
  }
  return acc;
}

function hasClientDirective(content) {
  // Simple check for "use client" directive at top of file
  // We consider either "use client" with double or single quotes
  return content.includes('\"use client\"') || content.includes('\'use client\'');
}

function usesHook(content, hook) {
  const re = new RegExp(`\\b${hook}\\s*\\(`, 'g');
  return re.test(content);
}

function main() {
  const root = process.cwd();
  const files = walk(root, []);
  const offenders = [];

  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const usesState = usesHook(content, 'useState');
    const usesRouter = usesHook(content, 'useRouter');
    if (usesState || usesRouter) {
      if (!hasClientDirective(content)) {
        offenders.push({ file: f, usesState, usesRouter });
      }
    }
  }

  if (offenders.length === 0) {
    console.log('OK: All TS/TSX files using useState/useRouter have a client boundary directive.');
    process.exit(0);
  } else {
    console.log(`FOUND ${offenders.length} file(s) missing top-level "use client" directive despite using React hooks:`);
    offenders.forEach(o => {
      console.log(`- ${o.file} (usesState=${o.usesState}, usesRouter=${o.usesRouter})`);
    });
    process.exit(1);
  }
}

main();
