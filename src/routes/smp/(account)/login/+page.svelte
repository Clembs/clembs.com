<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { languages } from '../../locales';

	export let data;
	$: strings = languages[data.language];
</script>

<div class="login">
	<h1>{strings.login.title}</h1>

	<p>
		<i>
			{@html strings.login.description.replace(/clembs.com/g, '<a href="/account">clembs.com</a>')}
		</i>
	</p>

	<form use:enhance method="post">
		<TextInput label={strings.login.usernameInputLabel} name="username" type="text" required />

		<TextInput label={strings.login.passwordInputLabel} name="password" type="password" required />

		<Button inline={false} type="submit">{strings.login.logIn}</Button>
	</form>

	<p>
		{strings.login.noAccount}
		<a href="/smp/register">{strings.login.register}</a>
	</p>

	<p>
		{strings.login.forgotPassword}
	</p>
</div>

<style lang="scss">
	form {
		margin: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
