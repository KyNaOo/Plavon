import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@WebSocketGateway()
export class GroupsGateway {
    constructor(private readonly groupsService: GroupsService) { }

    @SubscribeMessage('createGroup')
    async handleCreateGroup(client: Socket, createGroupDto: CreateGroupDto) {
        const group = this.groupsService.create(createGroupDto);
        client.emit('groupCreated', group);
    }

    @SubscribeMessage('joinGroup')
    async handleJoinGroup(client: Socket, room: string) {
        client.join(room);
    }

    @SubscribeMessage('leaveGroup')
    async handleLeaveGroup(client: Socket, room: string) {
        client.leave(room);
    }


    @SubscribeMessage('updateGroup')
    async handleUpdateGroup(client: Socket, updateGroupDto: UpdateGroupDto) {
        // TODO
    }

    @SubscribeMessage('getUserGroups')
    async handleGetUserGroups(client: Socket) {
        // TODO
    }

    @SubscribeMessage('deleteGroup')
    async handleDeleteGroup(client: Socket, groupId: number) {
        // TODO
    }
}
