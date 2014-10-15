<?php
$target_dir = "uploads/";
$target_dir = $target_dir . basename( $_FILES["uploadFile"]["name"]);
$uploadOk=1;

if (file_exists($target_dir . $_FILES["uploadFile"]["name"])) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

if ($uploadOk==0) {
    echo "Sorry, your file was not uploaded.";
} else { 
    if (move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target_dir)) {
        echo "The file ". basename( $_FILES["uploadFile"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>