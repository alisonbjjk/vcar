<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Verificador</title>
    <link rel="icon" type="image/x-icon" href="../apis/img/icon.png">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />
    <style>
        .modal-personalizado {
            min-width: 80%;
            /* margin-left: 70; // aqui vc escolhe */
        }

        .modal-personalizado.modal-content {
            min-height: 150vh;
        }
    </style>
</head>

<body>
    <div class="modal" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-personalizado" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="./index.html"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $("#myModal").modal({
            show: true
        });
    </script>
</body>

</html>