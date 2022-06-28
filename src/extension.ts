/*---------------------------------------------------------
 * NOB AUTOCOMPLETION
 * This is licensed under GNU GPL v2
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

function makeid() {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export function activate(context: vscode.ExtensionContext) {

	const provider1 = vscode.languages.registerCompletionItemProvider('nob', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const ifStatement = new vscode.CompletionItem('if');
			ifStatement.commitCharacters = ['\r'];
			ifStatement.documentation = new vscode.MarkdownString('Conditional statement, used for checking if something is something.');
			const otherwiseStatement = new vscode.CompletionItem('otherwise');
			otherwiseStatement.commitCharacters = ['\r'];
			otherwiseStatement.documentation = new vscode.MarkdownString('Executes if the last if-block returned false. Use `otherwise if` for multiple ifs.');
			const whileStatement = new vscode.CompletionItem('while');
			whileStatement.commitCharacters = ['\r'];
			whileStatement.documentation = new vscode.MarkdownString('A while loop');
			const untilStatement = new vscode.CompletionItem('until');
			untilStatement.commitCharacters = ['\r'];
			untilStatement.documentation = new vscode.MarkdownString('An until loop');
			const subStatement = new vscode.CompletionItem('sub');
			subStatement.commitCharacters = ['\r'];
			subStatement.documentation = new vscode.MarkdownString('Defines a new subroutine');
			const highStatement = new vscode.CompletionItem('high');
			highStatement.commitCharacters = ['\r'];
			highStatement.documentation = new vscode.MarkdownString('A high value, cannot be negative');
			const lowStatement = new vscode.CompletionItem('low');
			lowStatement.commitCharacters = ['\r'];
			lowStatement.documentation = new vscode.MarkdownString('A low value, can be negative');
			const forStatement = new vscode.CompletionItem('for');
			forStatement.commitCharacters = ['\r'];
			forStatement.documentation = new vscode.MarkdownString('A for loop, used to loop for a specific amount of times');
			const numberStatement = new vscode.CompletionItem('number');
			numberStatement.commitCharacters = ['\r'];
			numberStatement.documentation = new vscode.MarkdownString('Defines a new number (integer)');
			const byteStatement = new vscode.CompletionItem('byte');
			byteStatement.commitCharacters = ['\r'];
			byteStatement.documentation = new vscode.MarkdownString('Defines a new byte');
			const floatStatement = new vscode.CompletionItem('float');
			floatStatement.commitCharacters = ['\r'];
			floatStatement.documentation = new vscode.MarkdownString('Defines a new floating-point number');
			// return all completion items as array
			return [
				ifStatement,
				otherwiseStatement,
				whileStatement,
				untilStatement,
				subStatement,
				highStatement,
				lowStatement,
				forStatement,
				numberStatement,
				byteStatement,
				floatStatement,
			];
		}
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'nob',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const citem = new vscode.CompletionItem("<name>");
				citem.insertText = "myVariable".concat(makeid());
				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.substring(0, position.character);
				if ((linePrefix.endsWith('low ') || linePrefix.endsWith('high '))) {
					return [
						new vscode.CompletionItem('number'),
						new vscode.CompletionItem('float'),
					];
				}
				if ((linePrefix.endsWith("sub ") || linePrefix.endsWith("number ") || linePrefix.endsWith("byte ") || linePrefix.endsWith("float "))){
					return [
						citem,
					];
				}
			}
		},
		' ' // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(provider1, provider2);
}
