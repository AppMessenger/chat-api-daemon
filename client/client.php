<?php

require 'vendor/autoload.php';
require 'events/events.php';

$w = new WhatsProt($argv[1], $argv[2], true);

$events = new MyEvents($w);
$events->setEventsToListenFor($events->activeEvents);

$w->connect();
$w->loginWithPassword($argv[3]);

stream_set_blocking(STDIN, false);

while(true) {
  $input = trim(stream_get_contents(STDIN));

  if($input) {
    $input = explode(PHP_EOL, $input);
    foreach ($input as $command) {
      $command = json_decode($command);
      call_user_func_array(array($w, $command->method), $command->args);
      while ($w->pollMessage());
    }
  }

  $w->pollMessage();
}
