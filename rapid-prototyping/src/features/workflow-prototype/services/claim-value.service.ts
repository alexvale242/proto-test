import { writable } from 'svelte/store';

export class ClaimValueService {
    constructor() {
     }

    public claimValue = 13.17;
    public adjustedClaimValue = writable<number | null>(null);
    private checkValue: number | null = null;

    public writeClaimValue(value: number): void {
        this.adjustedClaimValue.set(value);
        this.checkValue = value;
    }

    public getCurrentClaimValue(): number {
        if (!!this.checkValue) {
            return this.checkValue;
        } else {
            return this.claimValue;
        }
    }
}

export default new ClaimValueService();
