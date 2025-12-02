// Serviço simples em memória — substitua por um DB real quando desejar
let children = [
{ id: '1', name: 'Lucas Silva', age: 3, guardian: 'Maria Silva' },
{ id: '2', name: 'Ana Costa', age: 4, guardian: 'João Costa' }
];


const { v4: uuidv4 } = require('uuid');


exports.getChildren = () => children;


exports.addChild = (payload) => {
const child = { id: uuidv4(), name: payload.name || 'Sem nome', age: payload.age || 0, guardian: payload.guardian || '' };
children.push(child);
return child;
};


exports.updateChild = (id, payload) => {
const idx = children.findIndex(c => c.id === id);
if (idx === -1) return null;
children[idx] = { ...children[idx], ...payload };
return children[idx];
};


exports.deleteChild = (id) => {
const idx = children.findIndex(c => c.id === id);
if (idx === -1) return false;
children.splice(idx, 1);
return true;
};