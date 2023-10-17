export interface Comment {
    name: string;
    date: string;
    comment: string;
    title: string;
  }
  
  export class ClaimActivityMockService {
    private comments: Comment[] = [
      {
        name: "John Doe",
        date: "2023-10-10",
        comment: "This collaboration is going well!",
        title: "Positive Feedback",
      },
      {
        name: "Alice Smith",
        date: "2023-10-12",
        comment: "I have some concerns about section 2.3.",
        title: "Concerns Raised",
      },
      {
        name: "Bob Johnson",
        date: "2023-10-14",
        comment: "Let's schedule a meeting to discuss the changes.",
        title: "Meeting Request",
      },
      // Add more comments as needed
    ];
  
    getComments(): Comment[] {
      return this.comments;
    }
  
    addComment(newComment: Comment): void {
      this.comments.push(newComment);
    }
  
    updateComment(updatedComment: Comment): void {
      const index = this.comments.findIndex((c) => c.date === updatedComment.date);
      if (index !== -1) {
        this.comments[index] = updatedComment;
      }
    }
  
    deleteComment(commentDate: string): void {
      const index = this.comments.findIndex((c) => c.date === commentDate);
      if (index !== -1) {
        this.comments.splice(index, 1);
      }
    }
  }