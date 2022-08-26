// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {setFont, convert} from './vsfiglet';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // add dispose to the context
  context.subscriptions.push(vscode.commands.registerCommand(
    'vsfiglet.setfont', setFont
  ));
  
  // add dispose to the context
  context.subscriptions.push(vscode.commands.registerCommand(
  'vsfiglet.convert', convert
  ));
}

// this method is called when your extension is deactivated
export function deactivate() {}
