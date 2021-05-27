set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR Cortex-A53)

set(CMAKE_C_COMPILER_WORKS 1)
set(CMAKE_CXX_COMPILER_WORKS 1)

set(CMAKE_C_COMPILER aarch64-linux-gnu-gcc)
set(CMAKE_CXX_COMPILER aarch64-linux-gnu-g++)

set(SYSROOTPATH /home/qjivy/work/toolchainbin/arm-gcc-linaro/aarch64/sysroot-glibc-linaro-2.25-2019.02-aarch64-linux-gnu/)

set(Cortex_A53_FLAGS "-Os -O3 -mcpu=cortex-a53 --sysroot=${SYSROOTPATH} -I${SYSROOTPATH}usr/include/")
set(CMAKE_C_FLAGS "${Cortex_A53_FLAGS}" CACHE STRING "" FORCE)
set(CMAKE_CXX_FLAGS "${Cortex_A53_FLAGS}" CACHE STRING "" FORCE)
