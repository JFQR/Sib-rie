import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connect")
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        id_of_sender = data['idOfSender']
        message = data['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'id_of_sender': id_of_sender,
            }
        )

    async def chat_message(self, event):
        print("chat_message")
        id_of_sender = event['id_of_sender']
        room_url = self.room_name
        message = event['message']
        
        await self.send(text_data=json.dumps({
            'message': message,
            'url': room_url,
            'id_of_sender':id_of_sender
        }))