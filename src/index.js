#!/usr/bin/env node
import {load} from 'json-update';
import pty from 'pty.js';
import isObject from 'isobject';

function installAll({presets, plugins}) {
  return new Promise( (resolve) => {
    presets = presets.map(p=>`babel-preset-${p}`);
    plugins = plugins.map(p=>`babel-plugin-${p}`);
    const cmd = 'npm';
    const args = ['i','-D'].concat(presets).concat(plugins);

    console.log('Installing:',args.slice(2).join());
    const term = pty.spawn(cmd, args,
      { name: process.env.TERM, cols:process.stdout.columns,
        rows: process.stdout.rows, cwd:process.cwd(), env:process.env});

    term.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    term.on('exit', (code) => {
      let wh = 'log';
      if (code != 0) wh = 'error';
      console[wh]('babelrc-install finished with exit code',code);
      resolve();
    });
  });
}

async function readRC() {
  try {
    const result = { presets: [], plugins: [] };
    const cfg = await load('.babelrc');
    if (!cfg) {
      console.log('No .babelrc found.');
      return {presets, plugins};
    }
    for (let type of ['presets','plugins'])
      for (let item of cfg[type])
        if (Array.isArray(item)) {
          for (let sub of item)
            if (!isObject(sub)) result[type].push(sub);
        } else {
          result[type].push(item);
        }
    return result;
  }
  catch (e) {
    console.error('Trouble reading .babelrc:',e);
  }
}

async function go() {
  const {presets, plugins} = await readRC();
  if (presets.length>0 || plugins.length > 0)
    await installAll({presets, plugins});
  else
    console.log('No presets or plugins found in .babelrc');
}

go().catch(console.error);

