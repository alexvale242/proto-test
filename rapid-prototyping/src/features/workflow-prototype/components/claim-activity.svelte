<script lang="ts">
  import { onMount } from 'svelte';
  import type { Comment } from '../services/claim-activity-mock';
  import { ClaimActivityMockService } from '../services/claim-activity-mock';
  import { DateDistanceService } from '../services/date-distance.service';

  const mockService = new ClaimActivityMockService();
  const dateDistanceService = new DateDistanceService();

  let comments: Comment[] = [];

  // Load data from the service when the component is mounted
  onMount(async () => {
    try {
      comments = mockService.getComments();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });

  function getFirstLetter(string: string): string {
    return string !== null ? string[0] : '';
  }
</script>

<h2>Claim Activity</h2>

{#each comments as comment}
  <div class="comment__container">
    <div class="comment__avatar">
      <div class="comment__avatar-letter">{getFirstLetter(comment.name)}</div>
    </div>
    <div class="comment__text">
      <div>
        <span class="comment__title">{comment.name}</span>
        <span>{dateDistanceService.getDateDistance(comment.date)}</span>
      </div>
      <div class="comment__comment">{comment.comment}</div>
    </div>
  </div>
{/each}

<style lang="scss">
  .comment__text {
    margin-left: 1rem;
    align-self: center;
  }
  .comment__avatar {
    width: 3rem;
    height: 3rem;
    border: 1px solid var(--eds-brand-color-border-base);
    border-radius: 100%;
  }
  .comment__avatar-letter {
    font-size: 2rem;
    text-align: center;
    margin-top: 0.5rem;
  }
  .comment__container {
    display: flex;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
  }
  .comment__title {
    font-size: 1.25rem;
    font-weight: 700;
    padding-right: 1rem;
  }
  .comment__comment {
    padding: 0.5rem;
    background-color: var(--eds-brand-color-background-secondary);
    margin-top: 0.75rem;
  }
</style>
