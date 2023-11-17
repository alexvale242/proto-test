<script lang="ts">
    import { onMount } from "svelte";
    import type { User } from "../models/user.model";

    const userMocks: User[] = [
        {
            name: "John Doe",
            signedOff: true,
            imgUrl: "user-profile-2.svg",
        },
        {
            name: "Alice Smith",
            signedOff: false,
            imgUrl: "user-profile-1.svg",
        },
        {
            name: "Bob Johnson",
            signedOff: false,
            imgUrl: "user-profile-3.svg",
        },
    ];

    let users: User[] = [];
    let numberOfUsers = 120;
    let expandedView = false;

    function generateUser(): User {
        const number = Math.floor(Math.random() * 3);
        return userMocks[number];
    }

    function generateUsers(numberOfUsers: number): User[] {
        let users: User[] = [];
        for (let i = 0; i < numberOfUsers; i++) {
            const user = generateUser();
            users.push(user);
        }

        return users;
    }

    function toggleExpand() {
        expandedView = !expandedView;
    }

    // Load data from the service when the component is mounted
    onMount(async () => {
        users = generateUsers(numberOfUsers);
    });
</script>

<div class="workflow-details__container {expandedView ? 'expanded' : ''}">
    <div class="workflow-details__users-list">
        <div class="heading">
            <h3>Users in group</h3>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#5A6F72"
                class="expand-icon"
                on:click={() => toggleExpand()}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
            </svg>
        </div>
        <ul class="users-list">
            {#each users as user}
                <li class="users-list__user">
                    <eds-avatar
                        class="user__avatar"
                        name={user?.name}
                        alt={user?.name}
                        image={user?.imgUrl}
                        size="xsmall"
                    />
                    {#if user?.signedOff}
                        <div class="sign-off sign-off--success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="#34B233"
                                width="1.5rem"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </div>
                    {:else}
                        <div class="sign-off">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="#82999C"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </div>
                    {/if}

                    <span class="user__name">{user?.name}</span>
                </li>
            {/each}
        </ul>
    </div>
</div>

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
            transition: border 0.5s, border-radius 0.5s;

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

    .workflow-details__container {
        width: 400px;
        height: 200px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
        padding: 1rem;
    }

    .workflow-details__users-list {
        height: 100%;
    }

    .users-list__user {
        display: flex;
        align-items: center;

        &:not(:first-child) {
            margin-top: 0.5rem;
        }
    }

    .users-list {
        list-style: none;
        padding: 0;
        margin: 0;
        height: calc(100% - 2rem);
        overflow: auto;
        @include format-scrollbar();
    }

    .user__avatar {
        display: inline;
    }

    .user__name {
        margin-left: 0.5rem;
    }

    .sign-off {
        border: 1px solid var(--eds-brand-color-border-base);
        background: white;
        border-radius: 100%;
        height: 1.5rem;
        width: 1.5rem;
        margin-left: -1rem;
        margin-bottom: -1rem;
    }

    .sign-off--success {
        svg {
            margin-left: -1px;
        }
    }

    .expand-icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .heading {
        height: 2rem;
        h3 {
            display: inline-block;
            width: calc(100% - 1.5rem);
        }
        svg {
            display: inline-block;
            float: right;
        }
    }

    .expanded {
        &.workflow-details__container {
            width: 800px;
            height: 400px;
        }

        .users-list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(auto-fill, 3rem);

        }
    }
</style>
