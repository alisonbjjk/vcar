// Enviar
$("#enviar").on("click", function () {
    $("#enviar").attr("disabled", true);

    var nome = $("#nome").val();
    var processo = $("#processo").val();
    var email = $("#email").val();
    var termos = $('#check1').map(function (i, el) {
        if ($(el).is(':checked')) {
            return $(el).val()
        }
    }).get();

    if (nome != '' && processo != '' && email != '' && termos.length == 1) {
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

        var groupBounds = drawnItems.getBounds();
        var center = groupBounds.getCenter();
        map.setView(center, map.getZoom());

        function updateSpecificProperties(geoJSON) {
            geoJSON.features.forEach(feature => {
                const properties = feature.properties;
                const keysToUpdate = ["angulo", "fill-opacity", "fill", "hachura", "id", "largura", "nome", "stroke-opacity", "stroke-width", "stroke", "tipo"];
                const updatedProperties = {};

                for (const key in properties) {
                    if (keysToUpdate.includes(key)) {
                        updatedProperties[`${key}_vcar`] = properties[key];
                    } else {
                        updatedProperties[key] = properties[key];
                    }
                }

                feature.properties = updatedProperties;
            });
            return geoJSON;
        }
        
        var collection = updateSpecificProperties(collection);
        var myForm = document.getElementById('frm');
        var dados = new FormData(myForm);
        var blob = new Blob([JSON.stringify(collection)], { type: "application/json" });
        dados.append("file", blob, 'vcar.geojson');

        var tipoMap = $("#tipoMapa option:selected").text();
        dados.append('tipoMapa', tipoMap);

        $.ajax({
            url: '../apis/ajax/enviar_pro.php',
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