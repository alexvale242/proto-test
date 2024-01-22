import { writable } from 'svelte/store';

export class ClaimValueService {
    constructor() { }

    public claimValue = writable(13.17);

    public writeClaimValue(value: number): void {
        this.claimValue.set(value);
    }
}

export default new ClaimValueService();
