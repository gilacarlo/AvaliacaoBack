import express from "express";
 
const app = express();
 
app.use(express.json());
 
const listaTarefas = [];
function acharIndexPeloId(id){
    index = 0;
    for(tarefa in listaTarefas){
        if(tarefa.id == id){
            return index;
        }
        index++;
    }
    return -1;
}
function adicionarLista(id, descricao, data, concluido){
    index = acharIndexPeloId(id);
    if(index == -1){
        console.log(`Ja existe esse id: ${id}`);
        res.send({message : `Ja existe esse id: ${id}`});
        return; 
    }else{
        listaTarefas.push({id, descricao, data, concluido});
    }
}
function verLista(verSomente_naoConcluidas){
    string = "";
    for(tarefa in listaTarefas){
        if(verSomente_naoConcluidas == true && tarefa.concluido == true){
            continue;
        }
        string += `
            \n------------------------------------------------------------------------
            \nid: ${tarefa.id} | data: ${tarefa.data} | concluido : ${tarefa.concluido}.
            \ndescricao: ${tarefa.descricao}
        `;
    }
    return string;
}
function mudarTarefa(id, descricao, data, concluido){
    index = acharIndexPeloId(id);
    tarefa;
    if(index == -1){
        console.log(`nao existe esse id: ${id}`);
        res.send({message : `nao existe esse id: ${id}`});
        return; 
    }
    tarefa = listaTarefas[index];
    if(descricao){
        tarefa.descricao = descricao;
    }
    if(data){
        tarefa.descricao = data;
    }
    if(concluido){
        tarefa.descricao = concluido;
    }
}

app.post("API/aa", (req, res) => {
    console.log("vai se fuder.");
    const id = Number(req.body.id);
    const descricao = req.body.preco;
    const data = req.body.data;
    const concluido = Boolean(req.body.concluido);

    adicionarLista(id, descricao, data, concluido);
    res.send({message : "tarefa criada!"});

});
 
app.get("API/verLista", (req, res) => {
    const naoConcluidas = req.query.naoConcluidas; //query

    res.send({message : verLista(naoConcluidas)});
});

app.put("", (req, res) => {
    const id = Number(req.body.id);
    const descricao = req.body.preco;
    const data = req.body.data;
    const concluido = Boolean(req.body.concluido);

    mudarTarefa();
});
 
app.delete("API/bruh", (req, res) => {
    res.send({message : "porra!"});
});
 
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});


/*
{
    "id":1, 
    "descricao":"fds", 
    "data":"10/10/2010", 
    "concluido":true
}
*/