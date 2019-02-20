const ts = require('typescript')

const createVariableStatement = (modifiers) => {
  return ts.createVariableStatement(
    modifiers, 
    ts.createVariableDeclarationList([  
      ts.createVariableDeclaration('expect', undefined, 
        ts.createPropertyAccess(ts.createIdentifier('chai'), 'expect')
      )
    ])
  )
}

export function transformer() {
  return (context) => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        node.statements = node.statements.map(statement => {
          if (ts.isImportDeclaration(statement) && statement.moduleSpecifier.getText().includes('chai')) {
            statement = createVariableStatement(statement.modifiers)
          }
          return statement;
        })
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor;
  }
}
