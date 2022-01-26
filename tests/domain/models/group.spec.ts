/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file

import { group } from 'console';

import { Group, GroupUser } from '../../../src/domain/model';

describe('Group', () => {
   it('should return false if userId is invalid', () => {
      const group = new Group({
         users: [{ id: 'any_user_id', permission: 'user' }],
      });
      const isAdmin = group.isAdmin('invalid_id');

      expect(isAdmin).toBe(false);
   });

   it('should return false if permission is user', () => {
      const group = new Group({
         users: [{ id: 'any_user_id', permission: 'user' }],
      });
      const isAdmin = group.isAdmin('any_user_id');

      expect(isAdmin).toBe(false);
   });

   it('should treu false if permission is admin', () => {
      const group = new Group({
         users: [{ id: 'any_user_id', permission: 'admin' }],
      });
      const isAdmin = group.isAdmin('any_user_id');

      expect(isAdmin).toBe(true);
   });

   it('should return true if permission is owner', () => {
      const group = new Group({
         users: [{ id: 'any_user_id', permission: 'owner' }],
      });
      const isAdmin = group.isAdmin('any_user_id');

      expect(isAdmin).toBe(true);
   });
});
