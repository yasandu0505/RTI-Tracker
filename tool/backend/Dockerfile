FROM python:3.13-slim

# 1. Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 2. Set working directory
WORKDIR /app

# 3. Enable bytecode compilation and set PATH
ENV UV_COMPILE_BYTECODE=1
ENV PATH="/app/.venv/bin:$PATH"

# 4. Install dependencies FIRST (for better caching)
# We only copy the lockfile and pyproject.toml initially
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-cache --no-install-project

# 5. Copy the rest of the application
COPY . .

# 6. Final sync to install the project itself
RUN uv sync --frozen --no-cache

# 7. Run the app
CMD ["fastapi", "run", "main.py", "--port", "8000", "--host", "0.0.0.0"]