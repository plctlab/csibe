set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR Cortex-A53)

set(CMAKE_C_COMPILER_WORKS 1)
set(CMAKE_CXX_COMPILER_WORKS 1)

set(CMAKE_C_COMPILER armv8l-linux-gnueabihf-gcc)
set(CMAKE_CXX_COMPILER armv8l-linux-gnueabihf-g++)

set(SYSROOTPATH /home/qjivy/work/toolchainbin/arm-gcc-linaro/armv8l/sysroot-glibc-linaro-2.25-2019.02-armv8l-linux-gnueabihf)

set(Cortex_A53_FLAGS "-O3 -Os -mcpu=cortex-a53 --sysroot=${SYSROOTPATH} -I${SYSROOTPATH}usr/include/")
set(CMAKE_C_FLAGS "${Cortex_A53_FLAGS}" CACHE STRING "" FORCE)
set(CMAKE_CXX_FLAGS "${Cortex_A53_FLAGS}" CACHE STRING "" FORCE)
