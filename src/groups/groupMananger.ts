export namespace Groups {
  export class GroupMananger {
    private static groups: Map<GroupName, Phaser.Group> = new Map<GroupName, Phaser.Group>();

    public static getGroup(group: GroupName) {
      return GroupMananger.groups.get(group);
    }

    public static setGroup(groupName: GroupName, group: Phaser.Group) {
      GroupMananger.groups.set(groupName, group);
    }
  }

  export enum GroupName {
    ENEMIES = 'entites',
    GAME_LAYER = 'game_layer',
    DISASTER_BULLETS = 'disaster_Bullets',
    POWER_UPS = 'power_ups'
  }
}
