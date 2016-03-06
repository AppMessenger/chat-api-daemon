<?php

require 'vendor/autoload.php';
require 'events/events.php';

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$w = new WhatsProt(getenv('NUMBER'), getenv('NICKNAME'));

$events = new MyEvents($w);
$events->setEventsToListenFor($events->activeEvents);

$w->connect();
$w->loginWithPassword(getenv('PASSWORD'));

stream_set_blocking(STDIN, false);

while(true) {
  $input = trim(stream_get_contents(STDIN));

  if($input) {
    $input = explode(PHP_EOL, $input);
    foreach ($input as $command) {
      $command = json_decode($command);
      call_user_func_array(array($w, $command->method), $command->args);
    }
  }

  $w->pollMessage();
  sleep(1);
}
