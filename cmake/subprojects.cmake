function(adopt_subprojects)

    # Add subprojects for CMSIS
    set(CMSIS_PROJECT_NAME "CMSIS")
    if (";${SUBPROJECTS};" MATCHES ";${CMSIS_PROJECT_NAME};")
        list(REMOVE_ITEM SUBPROJECTS ${CMSIS_PROJECT_NAME})
        list(APPEND SUBPROJECTS
                CMSIS/BasicMathFunctions
                CMSIS/CommonTables
                CMSIS/ComplexMathFunctions
                CMSIS/ControllerFunctions
                CMSIS/FastMathFunctions
                CMSIS/FilteringFunctions
                CMSIS/MatrixFunctions
                CMSIS/StatisticsFunctions
                CMSIS/SupportFunctions
                CMSIS/TransformFunctions)
        set(SUBPROJECTS ${SUBPROJECTS} PARENT_SCOPE)
        set(CMSIS_BASE_DIR ${CSiBE_SRC_DIR}/CMSIS PARENT_SCOPE)
    endif()

    # Add subprojects for old CSiBE testbed
    set(OLD_CSIBE_PROJECT_NAME "CSiBE-v2.1.1")
    if (";${SUBPROJECTS};" MATCHES ";${OLD_CSIBE_PROJECT_NAME};")
        list(REMOVE_ITEM SUBPROJECTS ${OLD_CSIBE_PROJECT_NAME})
        list(APPEND SUBPROJECTS
                CSiBE-v2.1.1/bzip2-1.0.2
                CSiBE-v2.1.1/cg_compiler_opensrc
                CSiBE-v2.1.1/compiler
                CSiBE-v2.1.1/flex-2.5.31
                CSiBE-v2.1.1/jikespg-1.3
#                CSiBE-v2.1.1/jpeg-6b
#                CSiBE-v2.1.1/libmspack
                CSiBE-v2.1.1/libpng-1.2.5
                CSiBE-v2.1.1/lwip-0.5.3.preproc
                CSiBE-v2.1.1/mpeg2dec-0.3.1
                CSiBE-v2.1.1/mpgcut-1.1
                CSiBE-v2.1.1/OpenTCP-1.0.4
                CSiBE-v2.1.1/replaypc-0.4.0.preproc
                CSiBE-v2.1.1/teem-1.6.0-src
                CSiBE-v2.1.1/ttt-0.10.1.preproc
                CSiBE-v2.1.1/unrarlib-0.4.0
                CSiBE-v2.1.1/zlib-1.1.4)
        set(SUBPROJECTS ${SUBPROJECTS} PARENT_SCOPE)
        set(OLD_CSIBE_BASE_DIR ${CSiBE_SRC_DIR}/CSiBE-v2.1.1 PARENT_SCOPE)
    endif()

endfunction(adopt_subprojects)
