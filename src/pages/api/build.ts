import { exec } from "child_process";

function build() {
  return new Promise((res, rej) => {
    exec("./build", (error, stdout, stderr) => {
      if (error) {
        rej(`Error running build script: ${stderr}`);
      } else {
        res("Build script executed successfully");
      }
    });
  });
}

export async function POST() {
    console.log('Im in post');
    console.log(process.cwd());
  try {
    const result = await build();
    console.log(result);
    return new Response(
      JSON.stringify({
        data: result,
      }),
    );
  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({
        data: (err as Error).message,
      }),
    );
  }
}
