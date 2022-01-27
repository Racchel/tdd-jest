/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { set, reset } from 'mockdate';

interface ILoadLastEventRepository {
   loadLastEvent: (input: {
      groupId: string;
   }) => Promise<{ endDate: Date; reviewDurationInHours: number } | undefined>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositorySpy implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;
   output?: { endDate: Date; reviewDurationInHours: number };

   setEndDateAfterNow(): void {
      this.output = {
         endDate: new Date(new Date().getTime() + 1),
         reviewDurationInHours: 1,
      };
   }

   setEndDateEqualToNow(): void {
      this.output = {
         endDate: new Date(),
         reviewDurationInHours: 1,
      };
   }

   setEndDateBeforeNow(): void {
      this.output = {
         endDate: new Date(new Date().getTime() - 1),
         reviewDurationInHours: 1,
      };
   }

   async loadLastEvent({
      groupId,
   }: {
      groupId: string;
   }): Promise<{ endDate: Date; reviewDurationInHours: number } | undefined> {
      this.groupId = groupId;
      this.callsCount++;
      return this.output;
   }
}

class EventStatus {
   status: 'active' | 'inReview' | 'done';

   constructor(event?: { endDate: Date; reviewDurationInHours: number }) {
      if (event === undefined) {
         this.status = 'done';
         return;
      }

      const now = new Date();
      if (event.endDate >= now) {
         this.status = 'active';
         return;
      }

      const reviewDurationInMs = event.reviewDurationInHours * 60 * 60 * 1000;
      const reviewDate = new Date(event.endDate).getTime() + reviewDurationInMs;
      this.status = reviewDate >= now ? 'inReview' : 'done';
   }
}

class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform({ groupId }: { groupId: string }): Promise<EventStatus> {
      const event = await this.loadLastEventRepository.loadLastEvent({
         groupId,
      });
      return new EventStatus(event);
   }
}

type SutTypes = {
   sut: CheckLastEventStatus;
   loadLastEventRepository: LoadLastEventRepositorySpy;
};

const makeSut = (): SutTypes => {
   const loadLastEventRepository = new LoadLastEventRepositorySpy();
   const sut = new CheckLastEventStatus(loadLastEventRepository);
   return {
      sut,
      loadLastEventRepository,
   };
};

describe('CheckLastEventStatus', () => {
   const groupId = 'any_group_id';

   beforeAll(() => {
      set(new Date());
   });

   afterAll(() => {
      reset();
   });

   it('should get last event data', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();

      // Act
      await sut.perform({ groupId: 'any_group_id' });

      // Assert
      expect(loadLastEventRepository.groupId).toBe(groupId);
      expect(loadLastEventRepository.callsCount).toBe(1);
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = undefined;

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('done');
   });

   it('should return status active when now is before event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.setEndDateAfterNow();
      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('active');
   });

   it('should return status active when now is equal to event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.setEndDateEqualToNow();

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('active');
   });

   it('should return status inReview when now is after event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.setEndDateBeforeNow();

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('inReview');
   });

   it('should return status inReview when now is before review time', async () => {
      // Arranje
      const reviewDurationInHours = 1;
      const reviewDurationInMs = reviewDurationInHours * 60 * 60 * 1000;
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = {
         endDate: new Date(new Date().getTime() - reviewDurationInMs + 1),
         reviewDurationInHours,
      };

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('inReview');
   });

   it('should return status done when now is after review time', async () => {
      // Arranje
      const reviewDurationInHours = 1;
      const reviewDurationInMs = reviewDurationInHours * 60 * 60 * 1000;
      const { sut, loadLastEventRepository } = makeSut();

      loadLastEventRepository.output = {
         endDate: new Date(new Date().getTime() - reviewDurationInMs - 1),
         reviewDurationInHours,
      };

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('done');
   });
});
