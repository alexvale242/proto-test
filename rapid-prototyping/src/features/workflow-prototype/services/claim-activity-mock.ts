import { writable } from 'svelte/store';

export interface Comment {
    name: string;
    date: string;
    comment: string;
    isQuery: boolean;
    isQueryResolution?: boolean;
}

export class ClaimActivityMockService {
    private getDefaultComments(): Comment[] {
        return [
            {
                name: "John Doe",
                date: "2023-10-10",
                comment: "Thanks Alice. Looks great"!,
                isQuery: false
            },
            {
                name: "Bob Johnson",
                date: "2023-10-12",
                comment: "13.17 CUR seems a little high to me, I'm only willing to pay 13.15 CUR",
                isQuery: false,
            },
            {
                name: "Alice Smith",
                date: "2023-10-14",
                comment: "Let's schedule a meeting to discuss the changes.",
                isQuery: false
            }
        ]
    }

    public commentsState = writable(this.getDefaultComments());

    addComment(newComment: Comment): void {
        this.commentsState.update((comments) => {
            const newComments = [...comments];
            newComments.push(newComment);
            return newComments;
        })
    }

    createComment(name: string, comment: string, isQuery: boolean): Comment {
        return {
            name: name,
            comment: comment,
            date: "2023-10-20",
            isQuery: isQuery
        }
    }

    createQueryResolution(name: string, comment: string): Comment {
        return {
            name: name,
            comment: comment,
            date: "2023-10-20",
            isQuery: false,
            isQueryResolution: true
        }
    }

    public resetComments(): void {
        this.commentsState.update((comments) => { return this.getDefaultComments() });
    }
}

export default new ClaimActivityMockService();
