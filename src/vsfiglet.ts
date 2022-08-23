// Copyright (c) 2021 Sri Lakshmi Kanthan P
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { window, workspace } from "vscode";
import * as figlet from "figlet";


/***********************************
 * Internal non exported functions *
 **********************************/

/**
 * Get the select font from the editor
 * 
 * @returns the selected text
 */
function getSelectedText(): string | undefined {
  var activeEditor = window.activeTextEditor;
  
  if (!activeEditor) {
    return undefined;
  }

  var selection = activeEditor.selection;

  if (selection.isEmpty) {
    return undefined;
  }

  return activeEditor.document.getText(selection);
}

/**
 * Generate the Figlet options
 * 
 * @returns Options
 */
function getOptions(): figlet.Options {
  const config = workspace.getConfiguration("vsfiglet");
  return {
    horizontalLayout: config.get("horizontalLayout"),
    verticalLayout: config.get("verticalLayout"),
    font: config.get("font"),
    width: config.get("width"),
    whitespaceBreak: config.get("whitespaceBreak"),
  };
}

/***********************************
 *        exported functions       *
 ***********************************/

/**
 * Set the font in the editor for figlet
 */
export async function setFont(): Promise<void> {
  // Figlet fonts select new one
  const selected = await window.showQuickPick(
    figlet.fontsSync()
  );

  // set the font in the config
  if (selected !== undefined) {
    workspace.getConfiguration(
      "vsfiglet"
    ).update(
      "font", selected
    );
  }
}

/**
 * Convert the text to figlet
 */
export async function convert(): Promise<void> {
  var editor = window.activeTextEditor;
  var text = getSelectedText();
  var options = getOptions();

  if (!editor || !text) {
    return;
  }
  
  var fig = figlet.textSync(text, options);
  var selection = editor.selection;

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, fig);
  });
}
