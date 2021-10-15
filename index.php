<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Users</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class='container overflow-hidden'>
    <?php require_once 'modal/userModal.php';
    require_once 'modal/deleteModal.php'; ?>
    <h1 class="g-2 text-center">Users</h1>
    <?php include 'blocks/action.php';
    include_once 'blocks/table.php';
    include 'blocks/action.php'; ?>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"></script>
  <script src="js/script.js"></script>

</body>

</html>
