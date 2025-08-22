FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

WORKDIR /workspaces

# Install awscli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o "awscliv2.zip" \
	&& unzip awscliv2.zip \
	&& ./aws/install \
	&& rm awscliv2.zip

# Install GitHub CLI
RUN (type -p wget >/dev/null || (apt-get update && apt-get install wget -y)) \
	&& mkdir -p -m 755 /etc/apt/keyrings \
	&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& apt-get update \
	&& apt-get install gh -y