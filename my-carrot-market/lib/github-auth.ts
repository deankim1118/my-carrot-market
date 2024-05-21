export const getGithubAccessToken = async (
  code: string | null
): Promise<any> => {
  if (!code) {
    return new Response(null, { status: 400 });
  }
  const accessTokenParams = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(accessTokenParams).toString();
  const accessTokenUrl = `https://github.com/login/oauth/access_token?${formattedParams}`;

  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }
  return access_token;
};

interface IUserProfile {
  id: number;
  username: string;
  avatar: string;
  email: string | null;
}

export const getGithubUserProfile = async (
  access_token: string
): Promise<IUserProfile> => {
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-cache',
  });

  const { login, id, avatar_url, email } = await userProfileResponse.json();

  return {
    id,
    username: login,
    avatar: avatar_url,
    email,
  };
};
