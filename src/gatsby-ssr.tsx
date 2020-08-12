import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { IOptions } from './model';

/* -----------------------------------
 *
 * IRender
 *
 * -------------------------------- */

interface IRender {
  pathname: string;
  setHeadComponents(reactNodes: any[]): void;
  setPostBodyComponents(reactNodes: any[]): void;
  loadPageDataSync(pathname: string): any;
}

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

let webpackStatFile: any;

/* -----------------------------------
 *
 * onRender
 *
 * -------------------------------- */

export function onRenderBody(
  { pathname, setHeadComponents, setPostBodyComponents, loadPageDataSync }: IRender,
  pluginOptions: IOptions
) {
  const { result } = loadPageDataSync(pathname);

  if (!webpackStatFile) {
    const statFile =
      pluginOptions.statsFilePath || path.resolve('public', 'webpack.stats.json');

    let statFileContents: string;

    try {
      statFileContents = fs.readFileSync(statFile, 'utf8');
    } catch (error) {
      throw new Error(
        `gatsby-plugin-custom-entry: Failed to read the stats file ${statFile}.`
      );
    }

    try {
      webpackStatFile = JSON.parse(statFileContents);
    } catch (error) {
      throw new Error(
        `gatsby-plugin-custom-entry: Failed to JSON parse the file ${statFile}`
      );
    }
  }

  const entryLinks: React.ReactNode[] = [];
  const entryScripts: React.ReactNode[] = [];

  const entryPoint = result?.pageContext?.entry;

  if (!entryPoint) {
    return;
  }

  webpackStatFile.namedChunkGroups[entryPoint]?.assets.forEach((asset: string) => {
    if (asset.endsWith('.map') || /webpack-runtime/.test(asset)) {
      return;
    }

    entryLinks.push(<link key={asset} as="script" rel="preload" href={`/${asset}`} />);
    entryScripts.push(<script key={asset} src={`/${asset}`} async={true} />);
  }, []);

  setHeadComponents(entryLinks);
  setPostBodyComponents(entryScripts);
}
