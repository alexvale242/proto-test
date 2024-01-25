<script lang="ts">
    import { onMount } from "svelte";
    import type { Comment } from "../services/claim-activity-mock";
    import claimActivityMockService from "../services/claim-activity-mock";
    import { DateDistanceService } from "../services/date-distance.service";
    import ChatBox from "./chat-box.svelte";
    import workflowMockService from "../services/workflow-mock";
    const dateDistanceService = new DateDistanceService();

    let comments: Comment[] = [];
    let workflowIsQueried = false;

    export let queryModeEnabled = false;

    workflowMockService.workflowState.subscribe((workflow) => {
        workflowIsQueried = workflowMockService.getWorkflowInQuery(workflow);
    });

    // Load data from the service when the component is mounted
    onMount(async () => {
        try {
            claimActivityMockService.commentsState.subscribe(
                (commentsState) => {
                    comments = commentsState;
                },
            );

            const toggleElement = document.getElementById(
                "toggle-button-example",
            ) as any;
            if (toggleElement !== null) {
                toggleElement.states = [
                    {
                        id: "activity",
                        label: "Activity",
                    },
                    {
                        id: "comments",
                        label: "Comments",
                    },
                ];
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });

    function getFirstLetter(string: string): string {
        return string !== null ? string[0] : "";
    }
</script>

<section class="activity">
    <div class="heading">
        <h2>Claim Activity</h2>
        <eds-toggle-button
            id="toggle-button-example"
            currentstate="comments"
            disabled
            readonly
        />
    </div>
    <div class="comments__container {workflowIsQueried ? 'isQueried' : ''}">
        {#each comments as comment}
            <div
                class="comment__container {comment.isQuery
                    ? 'query'
                    : ''} {comment.isQueryResolution ? 'query-resolution' : ''}"
            >
                <div class="comment__avatar">
                    <div class="comment__avatar-letter">
                        {getFirstLetter(comment.name)}
                    </div>
                </div>
                <div class="comment__text">
                    <div>
                        <span class="comment__title">{comment.name}</span>
                        <span
                            >{dateDistanceService.getDateDistance(
                                comment.date,
                            )}</span
                        >
                    </div>
                    <div class="comment__comment">{comment.comment}</div>
                </div>
            </div>
        {/each}
    </div>
    <div class="chat__container">
        <ChatBox bind:queryModeEnabled="{queryModeEnabled}" />
    </div>
</section>

<style lang="scss">
    @mixin format-scrollbar($direction: vertical, $show-only-on-hover: true) {
        /* stylelint-disable max-line-length */
        @if $show-only-on-hover == true {
            scrollbar-color: var(--eds-color-white, #fff)
                var(--eds-color-white, #fff);
        } @else {
            scrollbar-color: var(--eds-color-steel-50, #82999c)
                var(--eds-color-white, #fff);
        }
        /* stylelint-enable max-line-length */

        scrollbar-width: thin;

        &::-webkit-scrollbar {
            @if $direction == horizontal {
                width: auto;
                height: 10px;
            } @else if $direction == vertical {
                width: 10px;
            } @else if $direction == both {
                width: 10px;
                height: 10px;
            }
        }

        &::-webkit-scrollbar-track {
            background: var(--eds-color-white, #fff);
        }

        &::-webkit-scrollbar-thumb {
            border: 2px var(--eds-color-white, #fff) solid;
            border-radius: 5px;
            transition:
                border 0.5s,
                border-radius 0.5s;

            @if $show-only-on-hover == false {
                background-color: var(--eds-color-steel-50, #82999c);
            }
        }

        @if $show-only-on-hover == true {
            &:hover {
                scrollbar-color: var(--eds-color-steel-50, #82999c)
                    var(--eds-color-white, #fff);

                &::-webkit-scrollbar-thumb {
                    background-color: var(--eds-color-steel-50, #82999c);
                }
            }
        }
    }

    h2 {
        margin: 0;
    }

    .chat__container {
        height: 12rem;
    }

    .isQueried {
        &.comments__container {
            height: calc(100svh - 35.5rem);
        }
    }

    .comments__container {
        overflow-y: auto;
        padding-right: 1rem;

        height: calc(100svh - 31rem);

        @include format-scrollbar();
    }
    .comment__text {
        margin-left: 1rem;
        align-self: center;

        * {
            line-height: 1.25rem;
        }
    }
    .comment__avatar {
        width: 3rem;
        height: 3rem;
        border: 1px solid var(--eds-brand-color-border-base);
        border-radius: 100%;
        flex: 0 0 3rem;
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
        padding-right: 0.5rem;
    }
    .comment__comment {
        padding: 0.5rem;
        background-color: var(--eds-brand-color-background-secondary);
        margin-top: 0.75rem;
    }

    .query {
        .comment__avatar {
            display: flex;

            .comment__avatar-letter {
                flex: 0 0 3rem;
            }

            &::after {
                content: "";
                display: block;
                background-color: orange;
                height: 3rem;
                width: 0.5rem;
                flex: 0 0 0.25rem;
                margin-left: 0.25rem;
            }
        }

        .comment__text {
            .comment__comment {
                border: 1px solid var(--eds-brand-color-status-warning);
                background-color: var(--eds-color-orange-10);
            }
        }
    }

    .query-resolution {
        .comment__avatar {
            display: flex;

            .comment__avatar-letter {
                flex: 0 0 3rem;
            }

            &::after {
                content: "";
                display: block;
                background-color: var(--eds-brand-color-status-info);
                height: 3rem;
                width: 0.5rem;
                flex: 0 0 0.25rem;
                margin-left: 0.25rem;
            }
        }

        .comment__text {
            .comment__comment {
                border: 1px solid var(--eds-brand-color-status-info);
                background-color: var(--eds-color-teal-10);
            }
        }
    }

    .heading {
        display: flex;
    }

    eds-toggle-button {
        display: block;
        max-width: 300px;
        flex: 0 0 300px;
    }
</style>
