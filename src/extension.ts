// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import VsFiglet from './vsfiglet';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// set the set font command
	let disposable = vscode.commands.registerCommand(
		'vsfiglet.setfont', 
		VsFiglet.setFont
	);

	// add dispose to the context
	context.subscriptions.push(disposable);

	// set the set style command
	disposable = vscode.commands.registerCommand(
		'vsfiglet.convert',
		VsFiglet.convert
	);

	// add dispose to the context
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
