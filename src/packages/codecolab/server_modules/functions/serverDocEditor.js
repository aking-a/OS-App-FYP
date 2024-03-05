function applyEdit(actions, doc) {
    let documentLines = doc.split('\n'); // Convert the document to a line array

    if (actions.Action === 'insert') {
        // Insert the text at the specified line and column
        const line = documentLines[actions.Start_Line - 1];
        const before = line.slice(0, actions.Start_Column - 1);
        const after = line.slice(actions.End_Column - 1);
        documentLines[actions.Start_Line - 1] = before + actions.Text + after;
    }

    if (actions.Action === 'delete') {
        // Delete the text at the specified line and column
        const line = documentLines[actions.Start_Line - 1];
        const before = line.slice(0, actions.Start_Column - 1);
        const after = line.slice(actions.End_Column - 1);
        documentLines[actions.Start_Line - 1] = before + actions.Text + after;
    }

    if (actions.Action === 'newline') {
        // Insert a newline at the specified line and column
        const line = documentLines[actions.Start_Line - 1];
        const before = line.slice(0, actions.Start_Column - 1);
        const after = line.slice(actions.Start_Column - 1);
        documentLines[actions.Start_Line - 1] = before + actions.Text + after;
    }

    return documentLines.join('\n'); // Convert the line array back to a document
}
module.exports = applyEdit;