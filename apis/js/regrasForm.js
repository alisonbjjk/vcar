// Enviar
$("#enviar").on("click", function () {

    $("#enviar").attr("disabled", true);

    var nome = $("#nome").val();
    var email = $("#email").val();
    var termos = $('#check1').map(function (i, el) {
        if ($(el).is(':checked')) {
            return $(el).val()
        }
    }).get();

    if (nome != '' && email != '' && termos.length == 1) {
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
            grecaptcha.reset();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, Inserir Georreferenciamento!",
            });
            return;
        }


        atividades = $('#atv').val();
        var tipoMap = $("#tipoMapa option:selected").text();
        atividades = atividades.join(';;')

        var myForm = document.getElementById('frm');
        var dados = new FormData(myForm);
        var blob = new Blob([JSON.stringify(collection)], { type: "application/json" });
        dados.append("file", blob, 'vcar.geojson');
        dados.append('atividades', atividades);
        dados.append('tipoMapa', tipoMap);

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
                        window.location.reload(true)
                    })
                }
                else {
                    $("#enviar").attr("disabled", false);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.mensagem,
                    });
                    grecaptcha.reset();
                }
            }
        });
    } else {
        $("#enviar").attr("disabled", false);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos obrigatórios!",
        });
    }
});
// Fim Enviar

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


function dmsToDecimal(degrees, minutes, seconds, direction) {
    var decimal = degrees + minutes / 60 + seconds / 3600;
    if (direction == "S" || direction == "W") {
        decimal = decimal * -1;
    }
    return decimal;
}

function parseDMS(dmsString) {
    var parts = dmsString.split(/[^\d\w]+/);
    var degrees = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var seconds = parseFloat(`${parts[2]}.${parts[3]}`);
    var direction = parts[4];
    return dmsToDecimal(degrees, minutes, seconds, direction);
}

$("#tipoCoord").change(function (e) {
    var tipo = $("#tipoCoord").val();
    if (tipo === 'utm') {
        $("#btnCoord").attr("disabled", false);
        $("#divUtm").removeClass('d-none');
        $("#divGrau").addClass('d-none');
        $("#divLatLong").addClass('d-none');
    } else if (tipo === 'grau') {
        $("#btnCoord").attr("disabled", false);
        $("#divGrau").removeClass('d-none');
        $("#divUtm").addClass('d-none');
        $("#divLatLong").addClass('d-none');
    } else if (tipo === 'latLong') {
        $("#btnCoord").attr("disabled", false);
        $("#divLatLong").removeClass('d-none');
        $("#divUtm").addClass('d-none');
        $("#divGrau").addClass('d-none');

    }
})

// Buscar com UTM
function buscaUtm() {
    var utmX = document.getElementById('utmX').value
    var utmY = document.getElementById('utmY').value
    var utmZona = document.getElementById('utmZone').value
    var utmZona = document.getElementById('utmZone').value
    var tipo = document.getElementById('tipoCoord').value

    var S = document.getElementById('grauS').value
    var W = document.getElementById('grauW').value

    var lat1 = document.getElementById('lat').value
    var long1 = document.getElementById('long').value

    if (S != '' && W != '' && tipo === 'grau') {
        var lat = parseDMS(`${S} S`);
        var lon = parseDMS(`${W} W`);

        drawnItems.clearLayers();
        var geojsonLayers = L.marker([lat, lon]).addTo(drawnItems);
        map.setView([lat, lon], 15);
        $('.modal').modal('hide');

    } else if (utmX != '' && utmY != '' && utmZona != '' && tipo === "utm") {
        var utm = `+proj=utm +zone=${parseInt(utmZona)} +south +ellps=GRS67 +units=m +no_defs`;
        var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
        var LatLong = proj4(utm, wgs84, [parseInt(utmX), parseInt(utmY)]);

        drawnItems.clearLayers();

        var geojsonLayers = L.marker([LatLong[1], LatLong[0]]).addTo(drawnItems);
        map.setView([LatLong[1], LatLong[0]], 15);
        $('.modal').modal('hide');

    } else if (lat1 != '' && long1 != '' && tipo === "latLong") {

        drawnItems.clearLayers();
        var geojsonLayers = L.marker([lat1, long1]).addTo(drawnItems);
        map.setView([lat1, long1], 15);
        $('.modal').modal('hide');

    } else {
        Swal.fire({
            icon: "error",
            title: "Atenção...",
            text: "Todos os campos são obrigatórios!",
        });
    }
}