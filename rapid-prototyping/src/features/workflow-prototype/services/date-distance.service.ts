import { formatDistance } from 'date-fns';

export class DateDistanceService {
    public getDateDistance(date: string): string {
        return formatDistance(new Date(date), Date.now(), {addSuffix: true});
    }
}
