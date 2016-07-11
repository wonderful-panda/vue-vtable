"use strict";
const path = require("path").posix;
const jade = require("jade");

module.exports = function(babel) {
    return {
        visitor: {
            CallExpression(p, state) {
                const opts = state.opts;
                const node = p.node;
                if (node.callee.name !== "require" || node.arguments.length !== 1) {
                    return;
                }
                const arg = node.arguments[0];
                if (arg.type !== "StringLiteral" || !arg.value.match(/^\..*\.jade$/)) {
                    return;
                }
                let jadepath = path.join(path.dirname(p.hub.file.opts.filename), arg.value);
                if (opts.sourceRoot && opts.jadeRoot && jadepath.startsWith(opts.sourceRoot + "/")) {
                    jadepath = path.join(opts.jadeRoot, jadepath.substr(opts.sourceRoot.length + 1));
                }
                const content = jade.compileFile(jadepath)();
                p.replaceWith(babel.types.stringLiteral(content));
            }
        }
    }
}