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

while(true) {
  $w->pollMessage();
  sleep(1);
}
