const campoNome = document.getElementById("nome");
const campoData = document.getElementById("data");
const botao = document.getElementById("cadastrar");
const resultado = document.getElementById("resultado");

function carregarPessoas() {
  try {
    return JSON.parse(localStorage.getItem("pessoas")) || [];
  } catch (erro) {
    return [];
  }
}

function salvarPessoas(pessoas) {
  try {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
  } catch (erro) {
    console.error("Não foi possível salvar", erro);
  }
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return dia + "/" + mes + "/" + ano;
}

function mostrarMesmoAno(pessoa, pessoas) {
  const ano = pessoa.data.split("-")[0];
  const outras = pessoas.filter(function (p) {
    return p.data.split("-")[0] === ano && p.nome !== pessoa.nome;
  });

  let html = "<h2>Nascidos em " + ano + "</h2><ul>";
  outras.forEach(function (p) {
    html += '<li>' + p.nome + ' <span class="data">' + formatarData(p.data) + "</span></li>";
  });
  html += "</ul>";
  resultado.innerHTML = html;
}

botao.addEventListener("click", function () {
  const pessoa = { nome: campoNome.value, data: campoData.value };
  const pessoas = carregarPessoas();
  pessoas.push(pessoa);
  salvarPessoas(pessoas);
  mostrarMesmoAno(pessoa, pessoas);
});
