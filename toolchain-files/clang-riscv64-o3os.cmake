set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR RISCV64)

set(CMAKE_C_COMPILER_WORKS 1)
set(CMAKE_CXX_COMPILER_WORKS 1)

set(triple riscv64)

set(CMAKE_C_COMPILER clang)
set(CMAKE_CXX_COMPILER clang++)

#set(RISCV64_FLAGS "--target=${triple} -Os -march=rv64gc --target=riscv64")
#set(RISCV64_FLAGS "--target=${triple} -Os -O3 --target=riscv64  -march=rv64imafdc -mabi=lp64d --gcc-toolchain=/home/qjivy/toolchain_src/github_riscv/install64elf-v1/ -B/home/qjivy/toolchain_src/github_riscv/install64elf-v1/riscv64-unknown-elf/bin/")
set(RISCV64_FLAGS "--target=${triple} -Os --target=riscv64  -march=rv64imafdc -mabi=lp64d --gcc-toolchain=/home/qjivy/work/riscv/new-GB-GCC/install64trunk/ -B/home/qjivy/work/riscv/new-GB-GCC/install64trunk/riscv64-unknown-elf/bin/")
set(CMAKE_C_FLAGS "${RISCV64_FLAGS}" CACHE STRING "" FORCE)
set(CMAKE_CXX_FLAGS "${RISCV64_FLAGS}" CACHE STRING "" FORCE)
