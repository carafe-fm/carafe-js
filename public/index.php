<?php
//function publishBundle($bundle) : string
//{
//    $filename = 'Carafe-Implementation_' . str_replace(' ', '-', $bundle->implementation->name) .
//        "_v" . str_replace('.', '-', $bundle->implementation->semanticVersion) . '.json';
//
//    file_put_contents('./bundles/' . $filename, json_encode($bundle, JSON_PRETTY_PRINT));
//
//    return $filename;
//}
//
//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//    $postedData = json_decode(file_get_contents("php://input"));
//
//    echo json_encode([
//        "success" => true,
//        "filename" => publishBundle($postedData->bundle),
//        "implementation" => $postedData->bundle->implementation->semanticVersion,
//        "location" => "http://" . $_SERVER['HTTP_HOST'],
//    ]);
//    die();
//}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['reset'])) {
        $folderName = filter_input(INPUT_GET, "reset", FILTER_SANITIZE_STRING);

        if (null !== $folderName) {
            resetFolder($folderName);
        }
    }

    if (isset($_GET['delete'])) {
        $folderName = filter_input(INPUT_GET, "delete", FILTER_SANITIZE_STRING);
        $fileName = filter_input(INPUT_GET, "delete", FILTER_SANITIZE_STRING);

        preg_match("/(.+)_v(\d-\d-\d)$/", $fileName, $matches);

        $filename = 'Carafe-Implementation_' . str_replace([' ', '.', '_'], '-', $matches[1]) .
            "_v" . str_replace('.', '-', $matches[2]) . '.json';


        if (null !== $folderName) {
            deleteBundleAndFolder($folderName, $filename);
        }
    }
}

?><!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="./apps/CarafeMarketplace.bundle.js"></script>
        <meta name="description" content="Carafé Demo">
        <meta name="author" content="Soliant Consulting">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
              integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
              crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css"
              href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <style>
            .carafeIframe{
                height:400px;
                padding-top:10px;
            }
        </style>
    </head>
    <body>
        <header>
            <!-- Fixed navbar -->
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" href="#">Carafe</a>
            </nav>
        </header>

        <!-- Begin page content -->
        <main role="main" class="container" style="padding-top: 60px;">
            <?php
            $errorMessage = '';

            foreach (glob('./bundles/*.json') as $bundle) {
                $rawBundle = file_get_contents($bundle);
                $bundleJson = json_decode($rawBundle);

                if(isset($bundleJson->dist)
                    && isset($bundleJson->dist->implementationHtml)
                    && isset($bundleJson->implementation)
                    && isset($bundleJson->implementation->exampleJsonData)
                    && isset($bundleJson->implementation->metaData)
                    && isset($bundleJson->implementation->metaData->cdns)
                ) {
                    writeOutImplementation($bundleJson);

                    ?>
                    <script type="application/javascript">
                        jQuery(function() {
                            jQuery('#marketplace').append(
                                CarafeMarketplace.buildBundleHtml(
                                    <?php echo json_encode(json_decode($rawBundle, true)); ?>,
                                    'http://localhost:8000/carafe-packages-build/Carafe/Carafe.bundle.js',
                                    true
                                )
                            );
                        });
                    </script>
                    <?
                } else {
                    $errorMessage .= '<B>' . basename($bundle) . '</B> could not be imported. Try updating the ' .
                        'bundle to the latest version using Carafe.fm.<br>';
                    var_dump($errorMessage);
                }
            }
            ?>
            <div class="container" id="marketplace">
                <?php if (strlen($errorMessage)) : ?><div class="alert alert-danger"><?php echo $errorMessage; ?></div><?php endif; ?>
            </div>
        </main>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">Soliant Consulting</span>
            </div>
        </footer>
    </body>
</html>
<?php

function recursiveRemoveDirectory($directory)
{
    foreach (glob("{$directory}/*") as $file) {
        if (is_dir($file)) {
            recursiveRemoveDirectory($file);
        } else {
            unlink($file);
        }
    }

    rmdir($directory);
}

/**
 * @param $bundleJson
 */
function writeOutImplementation($bundleJson) : void
{
    // v0.6.0
    // extract parts
    $dist = $bundleJson->dist;
    $implementation = $bundleJson->implementation;
    $exampleJsonData = $implementation->exampleJsonData;
    unset($implementation->exampleJsonData);

    $folderPath = './carafe-implementations/' . str_replace(' ', '_', $implementation->name)
        . '_v' . str_replace('.', '-', $implementation->semanticVersion);
    $exampleJsonDataPath = $folderPath . '/exampleJsonData.json';
    $implementationDataPath = $folderPath . '/implementationData.json';
    $templatePath = $folderPath . '/template.html';

    if (! file_exists($folderPath) && ! mkdir($folderPath, 0777, true)) {
        die('Failed to create folders...');
    }

    if (! file_exists($exampleJsonDataPath) && ! file_put_contents($exampleJsonDataPath,
            json_encode($exampleJsonData, JSON_PRETTY_PRINT))) {
        die('Failed to create exampleJsonData.json...');
    }

    if (! file_exists($implementationDataPath) && ! file_put_contents($implementationDataPath,
            json_encode($implementation, JSON_PRETTY_PRINT))) {
        die('Failed to create implementationData.json...');
    }

    $implementationHtml = $dist->implementationHtml;
    $search = '/<!-- carafeZoneStart -->[\s\S]+?<!-- carafeZoneEnd  -->/';
    $replace = "<!-- carafeZoneStart -->\n\t\t<!-- Carafe Zone is mandatory. Do not modify. -->\n" .
        "\t\t<script src=\"../../carafe-packages-build/Carafe/Carafe.bundle.js\"></script>\n" .
        "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n" .
        "\t\t<script src=\"../../apps/CarafeTooling.bundle.js\"></script>\n" .
        "\t\t<!-- carafeZoneEnd  -->";
    $implementationHtml = preg_replace($search, $replace, $implementationHtml);

    if (! file_exists($templatePath) && ! file_put_contents($templatePath, $implementationHtml)) {
        die('Failed to create template.html...');
    }
}

function resetFolder(string $folderName)
{
    $implementationsPath = './carafe-implementations/';

    if (file_exists($implementationsPath . $folderName)) {
        recursiveRemoveDirectory($implementationsPath . $folderName);
        header("Location: " . "http://" . $_SERVER['HTTP_HOST']);
    }
}

function deleteBundleAndFolder(string $folderName, string $fileName)
{
    $implementationsPath = './carafe-implementations/';
    $bundlesPath = './bundles/';
    $redirect = false;

    if (file_exists($bundlesPath . $fileName)) {
        unlink($bundlesPath . $fileName);
        $redirect = true;
    }

    if (file_exists($implementationsPath . $folderName)) {
        recursiveRemoveDirectory($implementationsPath . $folderName);
        $redirect = true;
    }

    if ($redirect) {
        header("Location: " . "http://" . $_SERVER['HTTP_HOST']);
    }
}