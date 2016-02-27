<?php

require 'vendor/whatsapp/chat-api/src/events/AllEvents.php';

class MyEvents extends AllEvents
{
    /**
     * This is a list of all current events. Uncomment the ones you wish to listen to.
     * Every event that is uncommented - should then have a function below.
     *
     * @var array
     */
    public $activeEvents = [
        'onClose',
        'onCodeRegister',
        'onCodeRegisterFailed',
        'onCodeRequest',
        'onCodeRequestFailed',
        'onCodeRequestFailedTooRecent',
        'onConnect',
        'onConnectError',
        'onCredentialsBad',
        'onCredentialsGood',
        'onDisconnect',
        'onDissectPhone',
        'onDissectPhoneFailed',
        'onGetAudio',
        'onGetBroadcastLists',
        'onGetError',
        'onGetExtendAccount',
        'onGetGroupMessage',
        'onGetGroupParticipants',
        'onGetGroups',
        'onGetGroupsInfo',
        'onGetGroupsSubject',
        'onGetImage',
        'onGetLocation',
        'onGetMessage',
        'onGetNormalizedJid',
        'onGetPrivacyBlockedList',
        'onGetProfilePicture',
        'onGetReceipt',
        'onGetServerProperties',
        'onGetServicePricing',
        'onGetStatus',
        'onGetSyncResult',
        'onGetVideo',
        'onGetvCard',
        'onGroupCreate',
        'onGroupisCreated',
        'onGroupsChatCreate',
        'onGroupsChatEnd',
        'onGroupsParticipantsAdd',
        'onGroupsParticipantsPromote',
        'onGroupsParticipantsRemove',
        'onLoginFailed',
        'onLoginSuccess',
        'onAccountExpired',
        'onMediaMessageSent',
        'onMediaUploadFailed',
        'onMessageComposing',
        'onMessagePaused',
        'onMessageReceivedClient',
        'onMessageReceivedServer',
        'onPaidAccount',
        'onPing',
        'onPresenceAvailable',
        'onPresenceUnavailable',
        'onProfilePictureChanged',
        'onProfilePictureDeleted',
        'onSendMessage',
        'onSendMessageReceived',
        'onSendPong',
        'onSendPresence',
        'onSendStatusUpdate',
        'onStreamError',
        'onUploadFile',
        'onUploadFileFailed',
    ];

    protected function startListening()
    {
        foreach ($this->eventsToListenFor as $event) {
            $this->whatsProt->eventManager()->bind($event, [$this, "handle_$event"]);
        }

        return $this;
    }

    public function __call($method, $args) {
      $method = explode('_', $method);
      $method = $method[1];
      $response = new stdClass;
      $response->method = $method;
      $response->args = $args;

      echo json_encode($response) . "\n";
    }
}
