// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rendernewlines.execute', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from RenderNewLines!');

		const editor = vscode.window.activeTextEditor;

        if (editor) {
            // Get the current selection or the entire document
            const selection = editor.selection;
            const isSelectionEmpty = selection.isEmpty;

            // If selection is empty, use the entire document
            const start = isSelectionEmpty ? new vscode.Position(0, 0) : selection.start;
            const end = isSelectionEmpty ? new vscode.Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length) : selection.end;

            const text = editor.document.getText(new vscode.Range(start, end));

            // Replace the string (replace 'oldString' with your desired string)
            const replacedText = text.replace(/\\r\\n|\\n/g, "\r\n");

            // Replace the content in the editor
            editor.edit((editBuilder) => {
                editBuilder.replace(new vscode.Range(start, end), replacedText);
            });
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
