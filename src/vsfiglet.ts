// Copyright (c) 2021 Sri Lakshmi Kanthan P
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// load dependencies
import * as figlet from "figlet";
import * as vscode from "vscode";

/**
 * Main class for figlet
 */
class VsFiglet {
  /**
   * get the selected text
   */
  public static getSelectedText(): string | undefined {
    var activeEditor = vscode.window.activeTextEditor;
    
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
   * get options for the figlet
   */
  private static getOptions(): figlet.Options {
    const config = vscode.workspace.getConfiguration("vsfiglet");
    return {
      font: config.get("font"),
      horizontalLayout: config.get("horizontalLayout"),
      verticalLayout: config.get("verticalLayout"),
      width: config.get("width"),
      whitespaceBreak: config.get("whitespaceBreak"),
    };
  }

  /**
   * change the font of the figlet
   */
  public static setFont(): void {
    figlet.fonts((err, fonts) => {
      if (err !== null) {
        vscode.window.showErrorMessage(err.toString());
        return;
      } else if (fonts !== undefined) {
        vscode.window.showQuickPick(fonts).then((font) => {
          if (font !== undefined) {
            vscode.workspace.getConfiguration("vsfiglet").update("font", font);
            vscode.window.showInformationMessage(`Font changed to ${font}`);
          }
        });
      }
    });
  }

  /**
   * convert text to figlet
   */
  public static convert(): void {
    var text = VsFiglet.getSelectedText();
    var options = VsFiglet.getOptions();
    var editor = vscode.window.activeTextEditor;

    if (text === undefined) {
      vscode.window.showErrorMessage("No text selected");
      return;
    }

    if (editor === undefined) {
      vscode.window.showErrorMessage("No active Editor");
      return;
    }
    
    var fig = figlet.textSync(text, options);
    var selection = editor.selection;

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, fig);
    });
  }
}

// export the class
export default VsFiglet;
