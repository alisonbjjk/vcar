// Enviar
$("#enviar").on("click", function () {
    $("#enviar").attr("disabled", true);

    var nome = $("#nome").val();
    var cpf = $("#cpf").val();
    var email = $("#email").val();
    var termos = $('#check1').map(function (i, el) {
        if ($(el).is(':checked')) {
            return $(el).val()
        }
    }).get();

    if (nome != '' && cpf != '' && email != '' && termos.length == 1) {
        var collection = {
            "type": "FeatureCollection",
            "features": []
        };

        for (var x in drawnItems._layers) {
            var geojson = drawnItems._layers[x].toGeoJSON();
            if (geojson.type == 'FeatureCollection') {
                for (var x1 in geojson.features) {
                    collection.features.push(geojson.features[x1]);
                }
            } else {
                collection.features.push(geojson);
            }
        }

        if (collection.features.length == 0) {
            $("#enviar").attr("disabled", false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, Inserir Georreferenciamento!",
            });
            return;
        }

        var myForm = document.getElementById('frm');
        var dados = new FormData(myForm);
        var blob = new Blob([JSON.stringify(collection)], { type: "application/json" });
        dados.append("file", blob, 'vcar.geojson');

        $.ajax({
            url: '../apis/ajax/enviarEmail.php',
            type: 'POST',
            dataType: 'json',
            contentType: "multipart/form-data",
            data: dados,
            processData: false,
            contentType: false,
            beforeSend: function () { },
            success: function (data, status, jqXHR) {
                if (data.sucesso) {
                    Swal.fire({
                        title: 'Sucesso!',
                        html: data.mensagem,
                        imageUrl: '../apis/img/icon1.gif',
                        imageHeight: 120,
                        imageWidth: 120,
                    }).then((result) => {
                        location.reload()
                    })
                }
                else {
                    $("#enviar").attr("disabled", false);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.mensagem,
                    });
                    console.log(data.log);
                }
            }
        });
    } else {
        $("#enviar").attr("disabled", false);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos obrigatório!",
        });
    }
});

// Fim Enviar


// BuscaFile
document.getElementById('file').addEventListener('change', function (e) {
    e.preventDefault();
    var nameFile = e.target.files[0].name
    var extFile = nameFile.split('.').pop().toLowerCase()
    var fr = new FileReader();

    fr.onload = function () {
        if (extFile == 'kml') {
            var kmlImport = toGeoJSON.kml(new DOMParser().parseFromString(fr.result, "text/xml"))
            var arr = kmlImport.features;
            for (var i = 0; i < arr.length; i++) {
                var geojsonLayers = drawnItems.addLayer(L.geoJSON(arr[i].geometry));
                var bounds = geojsonLayers.getBounds()
                map.fitBounds(bounds)
                var center = bounds.getCenter()
                map.panTo(center)
            }
        } else if (extFile == 'shp') {
            fr.readAsDataURL(e.target.files[0]);
            fr.onload = function () {
                shp(fr.result).then(function (geojson) {
                    var arr = geojson.features;
                    for (var i = 0; i < arr.length; i++) {
                        var geojsonLayers = drawnItems.addLayer(L.geoJSON(arr[i].geometry));
                        var bounds = geojsonLayers.getBounds()
                        map.fitBounds(bounds)
                        var center = bounds.getCenter()
                        map.panTo(center)
                    }
                })
            };
        } else {
            alert('Extensão de arquivo não permitida');
        }
    }
    fr.readAsText(this.files[0]);
});
// Fim BuscaFile


// BuscaCEP
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            document.getElementById('cep').value = cep.substring(0, 5) + "-" + cep.substring(5);
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
// Fim BuscaCEP

$('#telefone').mask('(99) 99999-9999')
$('#cpf').mask('999.999.999-99')