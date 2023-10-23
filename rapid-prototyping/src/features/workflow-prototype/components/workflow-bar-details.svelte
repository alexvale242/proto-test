<script lang="ts">
</script>

<div class="workflow-details__container">
    <div class="workflow-details__users-list">
        <h3>Users in group</h3>
        <ul class="users-list">
            <li class="users-list__user">
                <eds-avatar
                    class="user__avatar"
                    name="John Doe"
                    alt="John Doe"
                    image="user-profile-2.svg"
                    size="xsmall"
                />
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
                <span class="user__name">John Doe</span>
            </li>
            <li class="users-list__user">
                <eds-avatar
                    class="user__avatar"
                    name="Alice Smith"
                    alt="Alice Smith"
                    image="user-profile-1.svg"
                    size="xsmall"
                />
                <div class="sign-off">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#EB514C"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <span class="user__name">Alice Smith</span>
            </li>
            <li class="users-list__user">
                <eds-avatar
                    class="user__avatar"
                    name="Bob Johnson"
                    alt="Bob Johnson"
                    image="user-profile-3.svg"
                    size="xsmall"
                />
                <div class="sign-off">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#EB514C"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <span class="user__name">Bob Johnson</span>
            </li>
        </ul>
    </div>
</div>

<style lang="scss">
    .workflow-details__container {
        width: 400px;
        height: 200px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
        padding: 1rem;
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
</style>
